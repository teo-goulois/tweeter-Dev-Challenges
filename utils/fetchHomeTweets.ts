import { Tweet } from "../types/typing"

export const fetchHomeTweets = async (following: string[]) => {
    
    const body = {
        following
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tweets/getHomeTweets`, {
        body: JSON.stringify(body),
        method: "POST",
      })    
    const data = await res.json()    
    const tweets: Tweet[] = data.tweets
    return tweets
}