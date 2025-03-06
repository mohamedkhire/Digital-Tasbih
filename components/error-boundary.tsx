"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo)
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Card className="w-full max-w-md mx-auto mt-8">
          <CardHeader>
            <CardTitle className="text-destructive">عذراً! حدث خطأ ما</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              نعتذر عن هذا الخطأ. يرجى المحاولة مرة أخرى أو الاتصال بنا إذا استمرت المشكلة.
            </p>
            {this.state.error && (
              <pre className="mt-4 p-4 bg-muted rounded-lg text-xs overflow-auto">{this.state.error.toString()}</pre>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={this.handleReset} variant="outline" className="w-full">
              إعادة المحاولة
            </Button>
          </CardFooter>
        </Card>
      )
    }

    return this.props.children
  }
}

