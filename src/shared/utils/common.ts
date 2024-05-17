

export const getRootDirectory = () => {
    const isDevEnv = process.env.NODE_ENV === "development";
    const dir = __dirname?.split(isDevEnv ? "src" : "dist");
    
    return dir?.[0];
}