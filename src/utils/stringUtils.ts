export function capitalize(str: string) {
    const normalizedWords = str.toLowerCase().trim().split(' ')
    return normalizedWords.map(word => word[0].toUpperCase() + word.slice(1)).join(' ')
}
