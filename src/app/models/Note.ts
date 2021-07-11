export interface Note {
    uuid: string
    author: string
    title: string
    description: string
    status: string
    created_at: Date | string
    initial_date: Date | string
    final_date: Date | string
}