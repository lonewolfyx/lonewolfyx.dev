export interface IOpenSourceRepository {
    icon: string
    name: string
    description: string
    url: string
}

export interface IOpenSource {
    organization: string
    repositories: IOpenSourceRepository[]
}
