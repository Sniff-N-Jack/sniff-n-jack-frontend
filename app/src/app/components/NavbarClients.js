import { useRouter } from 'next/navigation';

export default function Navbar() {
    const router = useRouter();

    const navigateTo = (path) => {
        router.push(path);
    };

    return (
        <nav>
            <ul>
                <li onClick={() => navigateTo('/')}>Home</li>
                <li onClick={() => navigateTo('/lessons')}>Lessons</li>
            </ul>

            {/* Styled JSX for scoped CSS */}
            <style jsx>{`
        ul {
        list-style: none;
        display: flex;
        gap: 15px;
        }
        li {
        cursor: pointer;
        color: blue;
        text-decoration: underline;
        }
    `}</style>
        </nav>
    );
}