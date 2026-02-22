import { FormEvent, useEffect, useMemo, useState } from 'react'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { useLocalStorageState } from '../../hooks/useLocalStorage'
import { useToast } from '../../components/ui/ToastContext'
import { applyDocumentTheme } from '../../lib/theme'

type SettingsForm = {
  displayName: string
  email: string
  address: string
  theme: 'light' | 'dark'
}

const SETTINGS_KEY = 'newton:settings'
const DEFAULT_SETTINGS: SettingsForm = {
  displayName: '',
  email: '',
  address: '',
  theme: 'light',
}

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/

const SettingsPage = () => {
  const { pushToast } = useToast()
  const [savedSettings, setSavedSettings] = useLocalStorageState<SettingsForm>(
    SETTINGS_KEY,
    DEFAULT_SETTINGS,
  )
  const [formState, setFormState] = useState<SettingsForm>({
    ...DEFAULT_SETTINGS,
    ...savedSettings,
  })

  useEffect(() => {
    setFormState({
      ...DEFAULT_SETTINGS,
      ...savedSettings,
    })
  }, [savedSettings])

  useEffect(() => {
    applyDocumentTheme(savedSettings.theme)
  }, [savedSettings.theme])

  const errors = useMemo(() => {
    const result: Record<keyof SettingsForm, string | null> = {
      displayName: null,
      email: null,
      address: null,
      theme: null,
    }

    if (formState.displayName.trim().length < 2) {
      result.displayName = 'Display name must be at least 2 characters'
    }
    if (!emailRegex.test(formState.email.trim())) {
      result.email = 'Enter a valid email address'
    }
    if (formState.address.trim().length < 5) {
      result.address = 'Enter a full mailing address'
    }

    return result
  }, [formState])

  const isDirty = useMemo(
    () => JSON.stringify(formState) !== JSON.stringify(savedSettings),
    [formState, savedSettings],
  )

  const isValid = !errors.displayName && !errors.email && !errors.address

  const updateField = <K extends keyof SettingsForm>(key: K, value: SettingsForm[K]) => {
    setFormState((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isDirty || !isValid) {
      return
    }
    setSavedSettings(formState)
    applyDocumentTheme(formState.theme)
    pushToast({ message: 'Settings saved', type: 'success' })
  }

  return (
    <Card as="form" className="settings-form" onSubmit={handleSubmit}>
      <h2>Profile</h2>
      <Input
        label="Display name"
        name="displayName"
        value={formState.displayName}
        onChange={(event) => updateField('displayName', event.currentTarget.value)}
        error={errors.displayName ?? undefined}
        placeholder="Ada Lovelace"
      />
      <Input
        label="Email"
        name="email"
        type="email"
        value={formState.email}
        onChange={(event) => updateField('email', event.currentTarget.value)}
        error={errors.email ?? undefined}
        placeholder="ada@example.com"
      />
      <Input
        label="Mailing address"
        name="address"
        value={formState.address}
        onChange={(event) => updateField('address', event.currentTarget.value)}
        error={errors.address ?? undefined}
        placeholder="742 Evergreen Terrace"
      />
      <div className="theme-toggle">
        <label htmlFor="theme-select">Theme</label>
        <select
          id="theme-select"
          value={formState.theme}
          onChange={(event) => updateField('theme', event.currentTarget.value as SettingsForm['theme'])}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div className="settings-actions">
        <Button type="submit" disabled={!isDirty || !isValid}>
          Save changes
        </Button>
        <Button type="button" variant="ghost" disabled={!isDirty} onClick={() => setFormState(savedSettings)}>
          Reset
        </Button>
      </div>
    </Card>
  )
}

export default SettingsPage
