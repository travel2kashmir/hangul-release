import * as snippet from '@segment/snippet'
export default function renderSnippet() {
    const opts = {
      // apiKey: process.env.NEXT_PUBLIC_ANALYTICS_WRITE_KEY,
      apiKey: "p6FoooEYSlUjNAbGxlJA2SSrtJUM3ezM",
      // note: the page option only covers SSR tracking.
      page: true,
    }

    if (process.env.NODE_ENV === 'development') {
      return snippet.max(opts)
    }

    return snippet.min(opts)
  }