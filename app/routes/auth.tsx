import { usePuterStore } from "~/lib/puter";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

export const meta = () => [
    { title: "HireAIlytics | Auth" },
    { name: "description", content: "Log into your account" },
];

const Auth = () => {
    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const navigate = useNavigate();

    const params = new URLSearchParams(location.search);
    const next = params.get("next");

    useEffect(() => {
        if (!isLoading && auth.isAuthenticated && next) {
            navigate(next);
        }
    }, [auth.isAuthenticated, isLoading, next, navigate]);

    const handleLogin = async () => {
        await auth.signIn();
        navigate(next || "/");
    };

    const handleLogout = async () => {
        await auth.signOut();
        navigate("/auth");
    };

    return (
        <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
            <div className="gradient-border shadow-lg">
                <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">

                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1>Welcome</h1>
                        <h2>Log In to Continue Your Job Journey</h2>
                    </div>

                    <div>
                        {isLoading ? (
                            <button className="auth-button animate-pulse">
                                <p>Signing you in...</p>
                            </button>
                        ) : auth.isAuthenticated ? (
                            <button className="auth-button" onClick={handleLogout}>
                                <p>Log Out</p>
                            </button>
                        ) : (
                            <button className="auth-button" onClick={handleLogin}>
                                <p>Log In</p>
                            </button>
                        )}
                    </div>

                </section>
            </div>
        </main>
    );
};

export default Auth;