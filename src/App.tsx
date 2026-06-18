import { useSendMoneyForm } from './hooks/useSendMoneyForm'
import { SendMoneyForm } from './components/SendMoneyForm'
import { ConfirmationScreen } from './components/ConfirmationScreen'
import { SuccessScreen } from './components/SuccessScreen'
import './index.css'

function App() {
  const hook = useSendMoneyForm()

  return (
    <div className="app">
      <div className="app__inner">

        {hook.step === 'form' && (
          <SendMoneyForm
            values={hook.values}
            errors={hook.errors}
            isValid={hook.isValid}
            sender={hook.sender}
            onChange={hook.handleChange}
            onSubmit={hook.handleSubmit}
          />
        )}

        {hook.step === 'confirm' && (
          <ConfirmationScreen
            values={hook.values}
            fee={hook.computeFee()}
            total={hook.computeTotal()}
            onConfirm={hook.handleConfirm}
            onCancel={hook.handleCancel}
          />
        )}

        {hook.step === 'success' && hook.transaction && (
          <SuccessScreen
            transaction={hook.transaction}
            onReset={hook.handleReset}
          />
        )}

      </div>
    </div>
  )
}

export default App