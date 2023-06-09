export type messageResponse = {
    channelId: number,
    content: string,
    createdAt: EpochTimeStamp,
    sender: {
        name: string
    }
}