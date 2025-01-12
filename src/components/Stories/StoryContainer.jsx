import React from 'react'
import styled from 'styled-components'
import { Grid, Typography } from '@mui/material'
import colors from '../../config/colors'
import { StoryPlayer } from './StoryPlayer'
import { ArchiveBody } from './ArchiveBody'
import { Gutter } from '../Layout/Gutter'

const GradientBox = styled.div`
    background: ${({ noBg }) => (noBg ? 'none' : 'rgb(24,113,119)')};
    background: ${({ noBg }) =>
        noBg
            ? 'none'
            : 'linear-gradient(180deg, rgba(24,113,119,1) 0%, rgba(102,69,20,1) 100%)'};
    color: white;
    padding: 1em;
    position: relative;
    a {
        color: ${({ noBg }) => (noBg ? 'initial' : 'white')};
    }
    h3 {
        padding-right: 1.5em;
    }
`

const ShareLink = styled.a`
    border: 1px solid white;
    padding: 0.5em;
    display: inline-block;
    font-size: 0.75rem;
    color: white;
    text-decoration: none;
`
const HarmLink = styled.a`
    font-size: 0.75rem;
    color: white;
    text-decoration: none;
`

const StyledShareButton = styled.a`
    position: absolute;
    top: 0;
    right: 0;
    color: ${({ light }) => (light ? colors.teal : colors.white)};
    text-decoration: none;
    padding: 1em;
    cursor: pointer;
`
const ShareNotificationText = styled.p`
    position: absolute;
    top: 2em;
    right: 0;
    padding: 0.5em;
    max-width: 25ch;
    color: ${({ light }) => (light ? colors.teal : colors.white)};
    background: ${({ light }) => (light ? colors.white : colors.teal)};
`
const ShareDummyInput = styled.input`
    position: fixed;
    left: 110%;
    top: 110%;
`

/**
 * Helper component for sharing a story
 *
 * @category Components/Stories
 * @param {Object} props
 * @param {StoryMeta} props.story
 * @param {string} props.title Title of the story
 * @param {boolean} props.light If true, use a light background
 * @component
 */
function ShareButton({ light, story, title }) {
    const url = `${process.env.PUBLIC_URL}/story/${story.id}`

    const [shared, setShared] = React.useState(false)
    const handleShare = async (params) => {
        const shareData = {
            title,
            text: `A ${story.type} story of the pandemic in ${story.county}.`,
            url,
        }

        try {
            await navigator.share(shareData)
        } catch (err) {
            let copyText = document.querySelector('#share-url')
            copyText.value = `${shareData.url}`
            copyText.style.display = 'block'
            copyText.select()
            copyText.setSelectionRange(0, 99999)
            navigator.clipboard.writeText(copyText.value)
            copyText.style.display = 'none'
            setShared(true)
            setTimeout(() => setShared(false), 5000)
        }
    }

    return (
        <>
            <StyledShareButton onClick={handleShare} light={light}>
                Share
            </StyledShareButton>
            {shared && (
                <ShareNotificationText light={light}>
                    Link copied to clipboard!
                </ShareNotificationText>
            )}
            <ShareDummyInput type="text" value="" id="share-url" readOnly />
        </>
    )
}

/**
 * Container for a story
 * 
 * @component
 * @category Components/Stories
 *
 * @param {Object} props
 * @param {StoryMeta} props.story Story metadata
 * @param {boolean} props.noBg If true, don't use a background gradient
 * @param {StoryMeta[]} props.relatedStories Stories related to this one to show
 *   below
 * @param {function} props.relatedStoriesCallback Callback to load a related
 *   story when clicked (story: StoryMeta) => void
 */
function StoryContainer({
    story,
    noBg = false,
    relatedStories = [],
    relatedStoriesCallback = () => {},
}) {
    if (!story.type) {
        return null
    }

    const { theme, tags, type, title, county } = story

    const entryTitle = title?.length ? title : `A ${type} story`
    return (
        <GradientBox noBg={noBg}>
            <Typography
                variant="h3"
                element="h2"
                fontFamily="'Playfair Display', serif;"
            >
                {entryTitle}
            </Typography>
            <Typography variant="h6" sx={{ pb: 1 }}>
                in {county}
            </Typography>
            <StoryPlayer story={story} />
            <Grid container sx={{ py: 2 }}>
                <Grid item xs={12} md={6}>
                    <Typography>Theme</Typography>
                    <Typography variant="h6" sx={{ pb: 1 }}>
                        {theme}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    {!!tags?.length && (
                        <>
                            <Typography>Tags</Typography>
                            <Typography variant="h6" sx={{ pb: 1 }}>
                                {tags.map((t) => `#${t}`).join(', ')}
                            </Typography>
                        </>
                    )}
                </Grid>
                <Grid
                    item
                    xs={12}
                    sx={{ pt: 2, borderTop: '1px solid #ffffff44' }}
                ></Grid>
                <Grid item xs={12} md={6}>
                    <ShareLink
                        href="https://stories.uscovidatlas.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Want to contribute to Atlas Stories?
                        <br />
                        Share your pandemic experience.
                    </ShareLink>
                </Grid>
                <Grid item xs={12} md={6}>
                    <HarmLink
                        href={`/contact?category=HarmfulContent&id=${story.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Is this content harmful? Report it here.
                    </HarmLink>
                </Grid>
            </Grid>
            <ShareButton light={noBg} story={story} title={entryTitle}>
                Share
            </ShareButton>
            {!!relatedStories?.length && (
                <>
                    <hr />
                    <br />
                    <Gutter h={'2em'} />
                    <br />
                    <h2>Here are some related stories:</h2>
                    <br />
                    <Gutter h={'2em'} />
                    <br />
                    <ArchiveBody
                        stories={relatedStories}
                        setActiveStory={relatedStoriesCallback}
                    />
                </>
            )}
        </GradientBox>
    )
}

export { StoryContainer }
