export function mapIdChannelType(channelId) {
    const CHANNEL_ID_TO_NAME = {
        10: '3d',
        6: 'image',
        9: 'sound',
        7: 'text',
        5: 'video',
    }

    return CHANNEL_ID_TO_NAME[channelId] || ''
}