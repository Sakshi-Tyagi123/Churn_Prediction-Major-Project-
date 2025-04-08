import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Upload from '../pages/Upload' // adjust path if needed

test('renders upload button', () => {
  render(
    <MemoryRouter>
      <Upload />
    </MemoryRouter>
  )

  const button = screen.getByRole('button', { name: /upload file/i })
  expect(button).toBeInTheDocument()
})
