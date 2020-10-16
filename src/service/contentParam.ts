export enum ContentType {characters = 'character', locations = 'location', episodes = 'episode'}

export const getContentTypeFromStr = (string: string) => {
    switch (string) {
        case ContentType.characters:
            return ContentType.characters

        case ContentType.locations:
            return ContentType.locations

        case ContentType.episodes:
            return ContentType.episodes

        default:
            return ContentType.characters
    }
}
