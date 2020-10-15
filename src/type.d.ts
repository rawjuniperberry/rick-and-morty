type TServer = {
    info: TInfo,
    results: TResults
}

type TInfo = {
    count: number, next: string | null, pages: number, prev: string | null,
}

type TResults = TCharacter[] | TLocation[] | TEpisode[]

type TCharacter = {
    created: string,
    episode: string[],
    gender: string,
    id: number,
    image: string,
    location: {
        name: string,
        url: string,
    },
    name: string,
    origin: {
        name: string,
        url: string,
    },
    species: string,
    status: string,
    type: string,
    url: string,
}

type TLocation = {
    'id': number,
    'name': string,
    'type': string,
    'dimension': string,
    'residents': string[],
    'url': string,
    'created': string
}

type TEpisode = {
    'id': number,
    'name': string,
    'air_date': string,
    'episode': string,
    'characters': string[],
    'url': string,
    'created': string
}
