"use client"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"
import { useSettingsStore } from "@/lib/store"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const { notificationsEnabled, setNotificationsEnabled, scanHistory, setScanHistory } = useSettingsStore()

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">Settings</h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize how EatSmarty looks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <RadioGroup id="theme" defaultValue={theme || "system"} onValueChange={(value) => setTheme(value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="theme-light" />
                    <Label htmlFor="theme-light" className="flex items-center gap-2">
                      <Sun className="h-4 w-4" />
                      Light
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="theme-dark" />
                    <Label htmlFor="theme-dark" className="flex items-center gap-2">
                      <Moon className="h-4 w-4" />
                      Dark
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="system" id="theme-system" />
                    <Label htmlFor="theme-system">System</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Manage notification preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications" className="flex-1">
                  Enable notifications
                </Label>
                <Switch id="notifications" checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
              </div>

              {notificationsEnabled && (
                <>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="product-alerts" className="flex-1">
                      Product alerts
                    </Label>
                    <Switch id="product-alerts" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="additive-updates" className="flex-1">
                      Additive database updates
                    </Label>
                    <Switch id="additive-updates" defaultChecked />
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Privacy</CardTitle>
            <CardDescription>Manage your data and privacy settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="scan-history" className="flex-1">
                  Save scan history
                </Label>
                <Switch id="scan-history" checked={scanHistory} onCheckedChange={setScanHistory} />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="analytics" className="flex-1">
                  Share anonymous usage data
                </Label>
                <Switch id="analytics" defaultChecked />
              </div>

              <Button variant="outline" className="w-full">
                Clear Scan History
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

