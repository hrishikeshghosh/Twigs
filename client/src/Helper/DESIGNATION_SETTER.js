const DESIGNATION_SETTER = designation => {
  switch (designation) {
    case 'Beginner':
      return '#7F8B52'
    case 'Talented':
      return '#FB9300'
    case 'Seasoned':
      return '#F54748'
    case 'Proficient':
      return '#293B5F'
    default:
      return '#7F8B52'
  }
}

export default DESIGNATION_SETTER
