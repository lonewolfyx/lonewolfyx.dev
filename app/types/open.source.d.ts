export interface IOpenSourceRepository {
    icon: string
    name: string
    description: string
    url: string
}

export interface IOpenSource {
    id: string
    organization: string
    repositories: IOpenSourceRepository[]
}
