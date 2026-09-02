import {Button} from "@/components/ui/button";
import Link from "next/link";
import {HealthCheck} from "@/components/health-check";

export default function Home() {
  return (
      <div className="flex min-h-screen items-center justify-center">
        <div>
          <h1>Welcome to EluxePR</h1>
          <p>Reviewing code the right way.</p>
        </div>
        <div className="flex gap-4">
          <Button>
            <Link href="/login">Login</Link>
          </Button>
          <Button>
            <Link href="/signup">Signup</Link>
          </Button>
          <HealthCheck />
        </div>
      </div>
  )
}
