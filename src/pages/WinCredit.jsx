import { useState } from 'react'
import {
  Container,
  Title,
  Text,
  NumberInput,
  Paper,
  Stack,
  Group,
  ThemeIcon,
  Image,
  Modal,
} from '@mantine/core'
import exampleImg from '../assets/wincredit_example.png'

export default function WinCredit() {
  const [balance, setBalance] = useState('')
  const [threshold, setThreshold] = useState('')
  const [cashbackRate, setCashbackRate] = useState('')
  const [extra, setExtra] = useState('')
  const [cartTotal, setCartTotal] = useState('')
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const num = (v) => (typeof v === 'number' ? v : parseFloat(v))
  const bal = num(balance)
  const thr = num(threshold)
  const rate = num(cashbackRate)
  const ext = num(extra)
  const cart = num(cartTotal)

  const hasInputs = bal >= 0 && thr > 0 && rate > 0

  const effectiveBalance = hasInputs
    ? bal + (ext >= 0 ? ext : 0)
    : null
  const amountNeeded = hasInputs ? Math.max(thr - effectiveBalance, 0) : null
  const spendRequired =
    hasInputs && amountNeeded > 0 ? amountNeeded / (rate / 100) : null
  const cartVal = cart >= 0 ? cart : 0
  const amountToAdd =
    spendRequired !== null ? Math.max(spendRequired - cartVal, 0) : null
  const cartMeetsSpend = spendRequired !== null && cartVal >= spendRequired
  const netCost =
    spendRequired !== null
      ? cartVal > 0
        ? cartMeetsSpend
          ? cartVal - thr
          : cartVal
        : spendRequired - thr
      : null
  const cartDiscount =
    cartVal > 0 && cartMeetsSpend ? (thr / cartVal) * 100 : null
  const effectiveDiscount =
    spendRequired !== null && spendRequired > 0
      ? (thr / spendRequired) * 100
      : null

  return (
    <Container size="sm">
      <Title order={1}>Win Credit Calculator</Title>
      <Text mt="xs" c="dimmed">
        Figure out how much you need to spend to unlock your Temu cash balance.
      </Text>

      <Text mt="md">
        In the temu app enter wincredit in the search. This promotion pays out
        actual cash as opposed to Temu credit. You should connect your paypal
        account, that is how the cash is paid out.
      </Text>

      <Stack mt="lg" gap="md">
        <NumberInput
          label="Available balance OR $x.xx secured"
          description="See screenshot"
          prefix="$"
          decimalScale={2}
          fixedDecimalScale
          min={0}
          value={balance}
          onChange={setBalance}
          placeholder="209.34"
        />

        <NumberInput
          label="Withdrawal Amount"
          description="The amount you need to reach to withdraw"
          prefix="$"
          decimalScale={2}
          fixedDecimalScale
          min={0}
          value={threshold}
          onChange={setThreshold}
          placeholder="210.00"
        />

        <NumberInput
          label="Cash Back Rate"
          description="Your cash back percentage"
          suffix="%"
          decimalScale={2}
          min={0}
          max={100}
          step={0.1}
          value={cashbackRate}
          onChange={setCashbackRate}
          placeholder="0.2"
        />

        <NumberInput
          label="Extra (optional)"
          description="Sometimes an Extra will appear next to the cash back rate"
          prefix="$"
          decimalScale={2}
          fixedDecimalScale
          min={0}
          value={extra}
          onChange={setExtra}
          placeholder="0.00"
        />

        <NumberInput
          label="Total in Your Cart"
          description="Current total of items in your Temu cart"
          prefix="$"
          decimalScale={2}
          fixedDecimalScale
          min={0}
          value={cartTotal}
          onChange={setCartTotal}
          placeholder="0.00"
        />

        {hasInputs && amountNeeded > 0 && (
          <Paper withBorder p="lg" mt="md" radius="md">
            <Stack gap="sm">
              <ResultRow
                label="Cash needed to unlock"
                value={`$${amountNeeded.toFixed(2)}`}
              />
              <ResultRow
                label="You need to spend"
                value={`$${spendRequired.toFixed(2)}`}
                bold
              />
              {cartVal > 0 && (
                <ResultRow
                  label="In your cart"
                  value={`$${cartVal.toFixed(2)}`}
                />
              )}
              <ResultRow
                label="Amount needed to add to cart"
                value={`$${amountToAdd.toFixed(2)}`}
                bold
              />
              <ResultRow
                label="Effective discount on minimum spend"
                value={`${effectiveDiscount.toFixed(1)}%`}
              />
              {cartVal > 0 && cartDiscount !== null && (
                <ResultRow
                  label="Effective discount on cart total"
                  value={`${cartDiscount.toFixed(1)}%`}
                />
              )}
              <ResultRow
                label="Net out-of-pocket cost"
                value={`$${netCost.toFixed(2)}`}
                description={
                  cartVal > 0 && !cartMeetsSpend
                    ? 'Cart is below required spend — no withdrawal yet'
                    : 'What you pay after withdrawing the cash'
                }
              />
            </Stack>
          </Paper>
        )}

        {hasInputs && amountNeeded === 0 && (
          <Paper withBorder p="lg" mt="md" radius="md">
            <Group>
              <ThemeIcon color="green" size="lg" radius="xl">
                ✓
              </ThemeIcon>
              <Text fw={600}>
                Your balance already meets the withdrawal threshold!
              </Text>
            </Group>
          </Paper>
        )}

        <Paper withBorder p="sm" mt="md" radius="md">
          <Image
            src={exampleImg}
            alt="Temu Win Credit example showing where to find your balance, withdrawal amount, and cash back rate"
            radius="sm"
            maw={700}
            mx="auto"
            onClick={() => setLightboxOpen(true)}
            style={{ cursor: 'pointer' }}
          />
          <Text size="xs" c="dimmed" ta="center" mt="xs">
            Example: Find these values on your Temu wincredit screen (click to enlarge)
          </Text>
        </Paper>

        <Modal
          opened={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          size="xl"
          centered
          withCloseButton
          padding={0}
          styles={{ body: { padding: 0 }, content: { background: 'transparent' } }}
        >
          <Image
            src={exampleImg}
            alt="Temu Win Credit example (enlarged)"
            radius="sm"
          />
        </Modal>
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
