import Link from "next/link";

interface UserProfileProps {
    params: {
        id: string;
    };
}

export default function UserProfile({ params }: UserProfileProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-2 bg-green-200 text-blue-800">
            <Link href="/profile" className="font-medium text-2xl">Profile</Link>
            <hr />
            <p className="text-4xl flex flex-col gap-2 items-center justify-center">
                Profile page 
                <span className="p-2 m-2 rounded bg-orange-500 text-black">{params.id}</span>
            </p>
            {/* <Link href="/verifyemail">verifyemail</Link> */}
        </div>
    );
}
