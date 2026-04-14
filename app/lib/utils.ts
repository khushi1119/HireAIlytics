import clsx, {type ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs:ClassValue[]) {
    return twMerge(clsx(...inputs));
}
export function formatSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

    // Determine the appropriate unit
    const i: number = Math.floor(Math.log(bytes) / Math.log(k));

    // Format number with 2 decimal places
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
export const generateUUID = () => crypto.randomUUID();