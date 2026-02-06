import { useState } from 'react'
import {
  Container,
  Title,
  Text,
  NumberInput,
  Paper,
  Stack,
  Group,
} from '@mantine/core'

export default function ClaimCredit() {
  const [cartTotal, setCartTotal] = useState('')
  const [pickMore, setPickMore] = useState('')
  const [maxCredit, setMaxCredit] = useState('')

  const num = (v) => (typeof v === 'number' ? v : parseFloat(v))
  const cart = num(cartTotal)
  const more = num(pickMore)
  const credit = num(maxCredit)

  const hasInputs = cart >= 0 && more >= 0 && credit > 0
  const cartVal = cart >= 0 ? cart : 0
  const totalSpend = hasInputs ? cartVal + more : null
  const bonusPercent = hasInputs && totalSpend > 0 ? (credit / totalSpend) * 100 : null
  const netCost = hasInputs ? totalSpend - credit : null
  const effectiveDiscount = hasInputs && totalSpend > 0 ? (credit / totalSpend) * 100 : null

  return (
    <Container size="sm">
      <Title order={1}>Claim Credit Calculator</Title>
      <Text mt="xs" c="dimmed">
        Figure out how much you need to spend to maximize your Temu credit bonus.
      </Text>

      <Text mt="md">
        Search claimcredit in the Temu app to access this offer. This promotion
        gives you Temu credit (not cash) based on a bonus percentage of your
        spend. In the app, it will tell you how much more to add to your cart
        and the max credit you can earn. This credit can't be applied to the
        current purchase, only the next purchase you place in Temu. Start by adding an item to your cart to get the numbers
        needed for this calculator.
      </Text>

      <Text mt="md">
        Note: this credit is paid out over 7 days and you must manually claim
        it. Go into the Temu app and type claimcredit, then claim your partial
        credit. You must do this every day for 7 days.
      </Text>

      <Stack mt="lg" gap="md">
        <NumberInput
          label="Current Cart Total"
          description="What's already in your cart"
          prefix="$"
          decimalScale={2}
          fixedDecimalScale
          min={0}
          value={cartTotal}
          onChange={setCartTotal}
          placeholder="0.00"
        />

        <NumberInput
          label="Pick $ More"
          description='The "pick $X more" amount shown by Temu'
          prefix="$"
          decimalScale={2}
          fixedDecimalScale
          min={0}
          value={pickMore}
          onChange={setPickMore}
          placeholder="60.00"
        />

        <NumberInput
          label="Max Credit"
          description='The "max $Y credit" amount shown by Temu'
          prefix="$"
          decimalScale={2}
          fixedDecimalScale
          min={0}
          value={maxCredit}
          onChange={setMaxCredit}
          placeholder="30.00"
        />

        {hasInputs && (
          <Paper withBorder p="lg" mt="md" radius="md">
            <Stack gap="sm">
              <ResultRow
                label="Total you need to spend"
                value={`$${totalSpend.toFixed(2)}`}
                bold
              />
              <ResultRow
                label="Credit you'll receive"
                value={`$${credit.toFixed(2)}`}
                description="Temu credit, not cash"
              />
              <ResultRow
                label="Credit bonus rate"
                value={`${bonusPercent.toFixed(0)}%`}
              />
              <ResultRow
                label="Effective discount"
                value={`${effectiveDiscount.toFixed(1)}%`}
              />
              <ResultRow
                label="Net cost for your goods"
                value={`$${netCost.toFixed(2)}`}
                description={`$${totalSpend.toFixed(2)} worth of goods for $${netCost.toFixed(2)}`}
              />
            </Stack>
          </Paper>
        )}
      </Stack>
    </Container>
  )
}

function ResultRow({ label, value, bold, description }) {
  return (
    <Group justify="space-between">
      <div>
        <Text size="sm" c="dimmed">
          {label}
        </Text>
        {description && (
          <Text size="xs" c="dimmed">
            {description}
          </Text>
        )}
      </div>
      <Text fw={bold ? 700 : 500} size={bold ? 'xl' : 'lg'}>
        {value}
      </Text>
    </Group>
  )
}
