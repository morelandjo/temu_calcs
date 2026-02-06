import { AppShell, Group, NavLink } from '@mantine/core'
import { Link, Outlet, useLocation } from 'react-router-dom'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Win Credit', to: '/win-credit' },
  { label: 'Claim Credit', to: '/claim-credit' },
]

export default function Layout() {
  const { pathname } = useLocation()

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md">
          {links.map((link) => (
            <NavLink
              key={link.to}
              component={Link}
              to={link.to}
              label={link.label}
              active={pathname === link.to}
              style={{ width: 'auto' }}
            />
          ))}
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}
