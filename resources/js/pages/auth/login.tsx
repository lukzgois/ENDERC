import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import GuestLayout from '@/layouts/guest-layout'
import { Head, Link, useForm } from '@inertiajs/react'
import { Loader2 } from 'lucide-react'
import { FormEventHandler } from 'react'

export default function Login({
  status,
  canResetPassword,
}: {
  status?: string
  canResetPassword: boolean
}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    post(route('login'), {
      onFinish: () => reset('password'),
    })
  }

  return (
    <GuestLayout>
      <Head title="Log in" />

      {status && (
        <div className="mb-4 text-sm font-medium text-green-600">{status}</div>
      )}

      <form onSubmit={submit}>
        <div>
          <Label htmlFor="email" hasError={!!errors.email}>
            Email
          </Label>

          <Input
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            autoFocus={true}
            onChange={(e) => setData('email', e.target.value)}
          />

          {!!errors.email && (
            <Label
              htmlFor="email"
              hasError={true}
              className="mt-2 inline-block"
            >
              {errors.email}
            </Label>
          )}
        </div>

        <div className="mt-4">
          <Label htmlFor="password" hasError={!!errors.password}>
            Password
          </Label>

          <Input
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="current-password"
            onChange={(e) => setData('password', e.target.value)}
          />

          {!!errors.password && (
            <Label
              htmlFor="password"
              hasError={true}
              className="mt-2 inline-block"
            >
              {errors.password}
            </Label>
          )}
        </div>

        <div className="mt-4 block">
          <label className="flex items-center space-x-2">
            <Checkbox
              name="remember"
              checked={data.remember}
              onCheckedChange={(checked) => setData('remember', !!checked)}
            />
            <span className="mt-0.5 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Remember me
            </span>
          </label>
        </div>

        <div className="mt-4 flex items-center justify-end">
          {canResetPassword && (
            <Link
              href={route('password.request')}
              className="text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Forgot your password?
            </Link>
          )}

          <Button disabled={processing} className="ms-4">
            {processing && <Loader2 className="animate-spin" />}
            {!processing && 'LOG IN'}
          </Button>
        </div>
      </form>
    </GuestLayout>
  )
}
