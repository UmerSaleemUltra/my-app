'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ClipboardList, Building2, Users, ChevronLeft, ChevronRight } from "lucide-react"

const taxRates = {
  llc: 0.15,
  corporation: 0.21,
}

const stateRates = {
  alabama: 0.04,
  alaska: 0.0,
  arizona: 0.056,
  arkansas: 0.065,
  california: 0.0884,
  colorado: 0.029,
  connecticut: 0.0635,
  delaware: 0.0,
  florida: 0.06,
  georgia: 0.04,
  hawaii: 0.04,
  idaho: 0.06,
  illinois: 0.0625,
  indiana: 0.07,
  iowa: 0.06,
  kansas: 0.065,
  kentucky: 0.06,
  louisiana: 0.04,
  maine: 0.055,
  maryland: 0.06,
  massachusetts: 0.0625,
  michigan: 0.06,
  minnesota: 0.06875,
  mississippi: 0.07,
  missouri: 0.04225,
  montana: 0.0,
  nebraska: 0.05,
  nevada: 0.0685,
  newhampshire: 0.0,
  newjersey: 0.06625,
  newmexico: 0.05125,
  newyork: 0.0685,
  northcarolina: 0.0475,
  northdakota: 0.05,
  ohio: 0.05,
  oklahoma: 0.045,
  oregon: 0.0,
  pennsylvania: 0.06,
  rhodeisland: 0.07,
  southcarolina: 0.06,
  southdakota: 0.04,
  tennessee: 0.07,
  texas: 0.0,
  utah: 0.0485,
  vermont: 0.06,
  virginia: 0.05,
  washington: 0.065,
  westvirginia: 0.06,
  wisconsin: 0.05,
  wyoming: 0.04,
}

function calculateTax(formData) {
  const revenue = parseFloat(formData.annualRevenue) || 0
  const entityRate = taxRates[formData.entityType] || 0
  const stateRate = stateRates[formData.stateOfOperation.toLowerCase().replace(/\s/g, '')] || 0

  const federalTax = revenue * entityRate
  const stateTax = revenue * stateRate

  return federalTax + stateTax
}

export default function Component() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    entityType: '',
    annualRevenue: '',
    employeeCount: '',
    stateOfOperation: ''
  })
  const [estimatedTax, setEstimatedTax] = useState(null)

  const totalSteps = 4
  const progress = (step / totalSteps) * 100

  const updateFormData = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      if (formData.entityType && formData.annualRevenue && formData.stateOfOperation) {
        const tax = calculateTax(formData)
        setEstimatedTax(tax)
      }
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50">
      {/* Left Panel */}
      <div className="w-full lg:w-1/3 bg-[#ea2024] p-6 lg:p-8 text-white">
        <div className="mb-6 lg:mb-8">
          <ClipboardList className="h-10 w-10 lg:h-12 lg:w-12 mb-4 lg:mb-6" />
          <h1 className="text-3xl lg:text-4xl font-bold mb-2 lg:mb-4">Estimate your US taxes</h1>
          <p className="text-sm lg:text-base text-red-100">
            Find out your tax liability and the requirements to run a fully compliant US business
          </p>
        </div>
        <Progress value={progress} className="h-2 bg-red-700" />
        <span className="text-sm text-red-100 mt-2 inline-block">{progress}%</span>
      </div>

      {/* Right Panel */}
      <div className="flex-1 p-6 lg:p-8">
        <div className="max-w-2xl mx-auto">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Type of entity</h2>
              <p className="text-gray-500">Choose your type of business entity</p>
              <RadioGroup
                value={formData.entityType}
                onValueChange={(value) => updateFormData('entityType', value)}
                className="grid gap-4"
              >
                <Card className="cursor-pointer transition-colors hover:bg-slate-50">
                  <CardContent className="flex items-center space-x-4 p-4">
                    <RadioGroupItem value="llc" id="llc" className="peer sr-only" />
                    <Label
                      htmlFor="llc"
                      className="flex flex-1 items-center space-x-4 cursor-pointer"
                    >
                      <Building2 className="h-8 w-8 text-[#ea2024]" />
                      <div>
                        <div className="font-semibold">LLC</div>
                        <div className="text-sm text-gray-500">Limited Liability Company</div>
                      </div>
                    </Label>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer transition-colors hover:bg-slate-50">
                  <CardContent className="flex items-center space-x-4 p-4">
                    <RadioGroupItem value="corporation" id="corporation" className="peer sr-only" />
                    <Label
                      htmlFor="corporation"
                      className="flex flex-1 items-center space-x-4 cursor-pointer"
                    >
                      <Users className="h-8 w-8 text-[#ea2024]" />
                      <div>
                        <div className="font-semibold">Corporation</div>
                        <div className="text-sm text-gray-500">C Corporation or S Corporation</div>
                      </div>
                    </Label>
                  </CardContent>
                </Card>
              </RadioGroup>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Annual Revenue</h2>
              <p className="text-gray-500">What is your expected annual revenue?</p>
              <Input
                type="number"
                placeholder="Enter amount in USD"
                value={formData.annualRevenue}
                onChange={(e) => updateFormData('annualRevenue', e.target.value)}
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Employee Count</h2>
              <p className="text-gray-500">How many employees do you have?</p>
              <Input
                type="number"
                placeholder="Enter number of employees"
                value={formData.employeeCount}
                onChange={(e) => updateFormData('employeeCount', e.target.value)}
              />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">State of Operation</h2>
              <p className="text-gray-500">In which US state do you primarily operate?</p>
              <Input
                type="text"
                placeholder="Enter state name"
                value={formData.stateOfOperation}
                onChange={(e) => updateFormData('stateOfOperation', e.target.value)}
              />
            </div>
          )}

          {estimatedTax !== null && (
            <div className="mt-8 p-6 bg-[#ea2024] text-white rounded-lg">
              <h2 className="text-2xl font-semibold mb-2">Estimated Tax</h2>
              <p className="text-3xl font-bold">${estimatedTax.toFixed(2)}</p>
              <p className="mt-2 text-sm">This is a rough estimate based on the information provided. Please consult with a tax professional for accurate calculations.</p>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
              className="flex items-center"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={handleNext}
              className="bg-[#ea2024] hover:bg-[#c51a1e] flex items-center"
            >
              {step < totalSteps ? 'Next' : 'Calculate'}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}