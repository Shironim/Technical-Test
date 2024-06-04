export function useFormatDate() {
  const formatDateTime = (inputDate) => {
    if (inputDate !== null) {
      const date = new Date(inputDate) // Mengonversi string tanggal ke objek Date
      let tahun = date.getFullYear()
      let bulan = date.getMonth()
      let spesifikDate = date.getDate()

      switch (bulan) {
        case 0:
          bulan = 'Jan'
          break
        case 1:
          bulan = 'Feb'
          break
        case 2:
          bulan = 'Mar'
          break
        case 3:
          bulan = 'Apr'
          break
        case 4:
          bulan = 'Mei'
          break
        case 5:
          bulan = 'Jun'
          break
        case 6:
          bulan = 'Jul'
          break
        case 7:
          bulan = 'Agu'
          break
        case 8:
          bulan = 'Sep'
          break
        case 9:
          bulan = 'Okt'
          break
        case 10:
          bulan = 'Nov'
          break
        case 11:
          bulan = 'Des'
          break
      }
      return `${tahun} ${bulan} ${spesifikDate}`
    }
    return '-'
  }
  return { formatDateTime }
}
