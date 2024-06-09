import { useState } from "react";
import useDataFetching from "./hooks/useDataFetching";
import { DateFilter, SalesChart, SalesTable, SearchBar, Statistics } from "./components";

function App() {
  const [dataSales, setDataSales] = useState([])

  const [dateSelected, setDateSelected] = useState([])
  const [startDate, endDate] = dateSelected;

  const [search, setSearch] = useState('')

  const { isLoading, refetch } = useDataFetching('/sales', {
    onSuccess: (data) => {
      setDataSales(data)
    },
    onError: (err) => console.log(err)
  })

  const onDateChange = (date) => {
    console.log(date)
    setDateSelected(date)
  }

  //   onbuttonsubmit = () =>  {
  //     this.setState( { bookings : this.state.bookings.filter( book => new Date(book.FromDate).getTime() >= this.state.startDate.getTime() && new Date(book.FromDate).getTime() <= this.state.endDate.getTime())});
  // }

  const onApply = () => {
    // refetch({
    //   start_date: startDate,
    //   end_date: endDate
    // })
  }

  const onSearch = () => {
    refetch({
      product: search
    })
  }

  return (
    <div className="container">
      <DateFilter startDate={startDate} endDate={endDate} onChange={onDateChange} onApply={onApply} />
      <SalesChart />

      <SearchBar search={search} setSearch={setSearch} onSearch={onSearch} />
      <SalesTable data={dataSales} isLoading={isLoading} />

      <Statistics data={dataSales} />
    </div>
  );
}

export default App;
