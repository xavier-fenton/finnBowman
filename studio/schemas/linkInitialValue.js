import {SanityClient} from '@sanity/client'

export default {
  // ...
  initialValue: async () => {
    const response = await SanityClient.fetch(`*[_type == "link"]`).catch((err) => new Error(err))
    console.log(response)
    return {initial: response.data[0].instaLink}
  },
}
