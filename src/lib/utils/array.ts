export function updateArray(stateArray: string[], value: string, checked: boolean): string[] {
    if (checked) {
        return [...stateArray, value];
    } else {
        return stateArray.filter(item => item !== value);
    }
}
