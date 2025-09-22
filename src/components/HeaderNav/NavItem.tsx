import { Link } from "react-router-dom"

export function NavItem({ to, children }: { to: string; children: React.ReactNode }){
    return (
        <Link to={ to } className="flex gap-1 items-center bg-primary text-text-light py-1 px-3 rounded">
            { children }
        </Link>
    )
}