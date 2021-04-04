export function mapIdChannelType(channelId) {
    const CHANNEL_ID_TO_NAME = {
        5: '3d',
        1: 'image',
        4: 'sound',
        2: 'text',
        3: 'video',
    }

    return CHANNEL_ID_TO_NAME[channelId] || ''
}