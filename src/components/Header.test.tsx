import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
  it('renders correctly', () => {
    render(<Header />);
    
    // Asume que el Header contiene el título de la aplicación
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
  
  it('displays logo', () => {
    render(<Header />);
    
    const logo = screen.getByAltText(/logo/i);
    expect(logo).toBeInTheDocument();
  });
  
  it('navigates when links are clicked', () => {
    const mockNavigate = vi.fn();
    
    // Mock de useNavigate o cualquier método de navegación que uses
    vi.mock('react-router-dom', () => ({
      ...vi.importActual('react-router-dom'),
      useNavigate: () => mockNavigate,
    }));
    
    render(<Header />);
    
    // Asume que hay un enlace de navegación en el Header
    const homeLink = screen.getByText(/inicio/i);
    fireEvent.click(homeLink);
    
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
  
  it('toggles mobile menu when button is clicked', () => {
    render(<Header />);
    
    // Asume que hay un botón para el menú móvil
    const menuButton = screen.getByLabelText(/menu/i);
    expect(screen.queryByRole('menu')).not.toBeVisible();
    
    fireEvent.click(menuButton);
    expect(screen.getByRole('menu')).toBeVisible();
  });
});