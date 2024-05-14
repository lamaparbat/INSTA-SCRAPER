import fs, { access } from "fs";

console.log( __dirname?.split("app")?.[0] + "app/assets/uploads/")
const getMediaByPath = async ({ filepath }: { filepath: string }) => {
    try {
        const fullPath = __dirname?.split("app")?.[0] + "app/assets/uploads/" + filepath;

        return await new Promise((resolve, reject) => {
            access(fullPath, fs.constants.F_OK, (err) => {
                if (err) return reject({ data: null, error: err });

                return resolve({ data: fullPath, error: null });
            });
        })
    } catch (error: any) {
        console.error(error);
        return { data: null, error: error?.message };
    }
}


export {
    getMediaByPath,
}