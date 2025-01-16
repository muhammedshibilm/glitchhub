export default async function cheackAuth() {
    try {
        const res = await fetch("/api/auth/login", {
            method: "GET",
        });

        return res.ok? true: false;

    } catch (error) {
        return false;
    }
}