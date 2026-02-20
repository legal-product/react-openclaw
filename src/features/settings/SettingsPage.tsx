import { FormEvent, useEffect, useMemo, useState } from 'react'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { useLocalStorageState } from '../../hooks/useLocalStorage'
import { useToast } from '../../components/ui/ToastContext'
import { applyDocumentTheme } from '../../lib/theme'

type SettingsData = {
  displayName: string
  email: string
  theme: 'light' | 'dark'
}

const DEFAULT_SETTINGS: SettingsData = {
  displayName: '',
  email: '',
  theme: 'light',
}

const SETTINGS_KEY = 'alexai:settings'

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/

const SettingsPage = () => {
  const { pushToast } = useToast()
  const [savedSettings, setSavedSettings] = useLocalStorageState<SettingsData>(
    SETTINGS_KEY,
    DEFAULT_SETTINGS,
  )
  const [formState, setFormState] = useState<SettingsData>(savedSettings)

  useEffect(() => {
    applyDocumentTheme(savedSettings.theme)
  }, [savedSettings.theme])

  const errors = useMemo(() => {
    const result: Record<keyof SettingsData, string | null> = {
      displayName: null,
      email: null,
      theme: null,
    }
    if (formState.displayName.trim().length < 2) {
      result.displayName = 'Display name must be at least 2 characters'
    }
    if (!emailRegex.test(formState.email.trim())) {
      result.email = 'Enter a valid email address'
    }
    return result
  }, [formState])

  const isDirty = useMemo(() => JSON.stringify(formState) !== JSON.stringify(savedSettings), [
    formState,
    savedSettings,
  ])

  const isValid = !errors.displayName && !errors.email

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isDirty || !isValid) return
    setSavedSettings(formState)
    applyDocumentTheme(formState.theme)
    pushToast({ message: 'Settings saved', type: 'success' })
  }

  const updateField = <K extends keyof SettingsData>(key: K, value: SettingsData[K]) => {
    setFormState((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <Card as="form" className="settings-form" onSubmit={handleSubmit}>
      <h2>Profile</h2>
      <Input
        label="Display name"
        value={formState.displayName}
        onChange={(event) => updateField('displayName', event.currentTarget.value)}
        error={errors.displayName ?? undefined}
        placeholder="Ada Lovelace"
        name="displayName"
      />
      <Input
        label="Email"
        value={formState.email}
        onChange={(event) => updateField('email', event.currentTarget.value)}
        error={errors.email ?? undefined}
        placeholder="ada@example.com"
        type="email"
        name="email"
      />
      <div className="theme-toggle">
        <label htmlFor="theme-select">Theme</label>
        <select
          id="theme-select"
          value={formState.theme}
          onChange={(event) => updateField('theme', event.currentTarget.value as SettingsData['theme'])}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div className="settings-actions">
        <Button type="submit" disabled={!isDirty || !isValid}>
          Save changes
        </Button>
        <Button
          type="button"
          variant="ghost"
          disabled={!isDirty}
          onClick={() => setFormState(savedSettings)}
        >
          Reset
        </Button>
      </div>
    </Card>
  )
}

export default SettingsPage
