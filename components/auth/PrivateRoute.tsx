import { useRouter } from 'next/router';
import { Fragment, useContext, useEffect, useState } from 'react';
import { authContext } from '../contexts/auth.context';
import Spinner from '../shared/Spinner';

const NAMESPACE = 'Private route wrapper component';
const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

const PrivateRoute = (props: any) => {
    const userInfo = useContext(authContext);
    const [renderContent, setRenderContent] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('jobber-auth-token');

        if (router.isReady) {
            if (token) {
                const checkUser = async () => {
                    try {
                        const res = await fetch(`${API_BASE}/auth`, {
                            method: 'GET',
                            headers: { 'jobber-auth-token': token },
                        });
                        const user = await res.json();
                        if (userInfo) {
                            // console.log(userInfo);

                            userInfo.setUser(user);
                            setRenderContent(true);
                        }
                    } catch (err: any) {
                        console.log('Check User Error', err);
                        setRenderContent(false);
                        localStorage.removeItem('jobber-auth-token');
                        router.push(`/auth/login?path=${router.asPath}`);
                    }
                };
                if (!renderContent) {
                    checkUser();
                }
            } else {
                setRenderContent(false);
                localStorage.removeItem('jobber-auth-token');
                router.push(`/auth/login?path=${router.asPath}`, '/auth/login');
            }
        }
    }, [router, userInfo, renderContent]);

    if (renderContent) {
        return <Fragment>{props.children}</Fragment>;
    } else {
        return <Spinner />;
    }
};

export default PrivateRoute;
