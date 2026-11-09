export function validateLogin(registrationNumber, password) {
  const registration = registrationNumber.trim().toUpperCase();
  if (!registration || !password) return 'Enter both your student ID and password.';
  if (!/^[A-Z]{6}\d{4}$/.test(registration)) {
    return 'Student ID must contain six letters followed by four digits, e.g. SCHELE2211.';
  }
  if (registration !== 'SCHELE2211' || password !== 'schele123') {
    return 'Incorrect Student ID or password.';
  }
  return '';
}

export function validateProfile(profile) {
  if (!profile.fullName.trim()) return 'Full name is required.';
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(profile.email.trim())) return 'Enter a valid email address.';
  if (!profile.phone.trim()) return 'Phone number is required.';
  return '';
}
