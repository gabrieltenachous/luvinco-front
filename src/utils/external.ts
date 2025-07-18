import type { AxiosError } from 'axios'
import Swal from 'sweetalert2'

export function showSuccess(title: string, message: string) {
  return Swal.fire({
    icon: 'success',
    title,
    text: message,
  })
}

export function showError(message?: string) {
  return Swal.fire({
    icon: 'error',
    title: 'Erro',
    text: message || 'Ocorreu um erro inesperado.',
  })
}

export function showWarning(message: string) {
  return Swal.fire({
    icon: 'warning',
    title: 'Atenção',
    text: message,
  })
}

export function extractErrorMessage(err: unknown, fallback = 'Erro inesperado'): string {
  const axiosError = err as AxiosError<{ message?: string }>
  return axiosError.response?.data?.message || fallback
}

export function formatDateBrazil(dateString: string): string {
  return new Date(dateString).toLocaleString('pt-BR')
}
