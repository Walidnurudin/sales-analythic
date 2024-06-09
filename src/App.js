import { useState } from "react";
import useDataFetching from "./hooks/useDataFetching";
import { DateFilter, SalesChart, SalesTable, SearchBar, Statistics } from "./components";
import { addOneDaysToDate } from "./utils/date";

function App() {
  const [dataSales, setDataSales] = useState([])
  const [dataSalesStatistic, setDataSalesStatistic] = useState([])
  const [dataSalesChart, setDataSalesChart] = useState([])

  const [dateSelected, setDateSelected] = useState([])
  const [startDate, endDate] = dateSelected;

  const [search, setSearch] = useState('')

  const { isLoading, refetch } = useDataFetching('/sales', {
    onSuccess: (data) => {
      setDataSales(data)
    },
    onError: (err) => console.log(err)
  })

  const { isLoading: isLoadingStatistic } = useDataFetching('/sales', {
    onSuccess: (data) => {
      setDataSalesStatistic(data)
    },
    onError: (err) => console.log(err)
  })

  const { isLoading: isLoadingChart, refetch: refetchChart } = useDataFetching('/sales', {
    onSuccess: (data) => {
      setDataSalesChart(data)
    },
    onError: (err) => console.log(err)
  })

  const onDateChange = (date) => {
    setDateSelected(date)
  }

  const onApply = async () => {
    await refetchChart()
    if (!startDate || !endDate) return;

    setDataSalesChart(prev => prev.filter(
      item => {
        const fromDate = new Date(item.date).getTime();
        return fromDate >= addOneDaysToDate(startDate).getTime() && fromDate <= addOneDaysToDate(endDate).getTime();
      }
    ));
  }

  const onSearch = () => {
    refetch({
      product: search
    })
  }

  return (
    <div className="min-w-[50%] max-w-[50%] mx-auto mt-[100px]">
      <h1 className="text-center mb-12 font-bold text-[30px]">Sales Analytics</h1>
      <div className="">
        <DateFilter startDate={startDate} endDate={endDate} onChange={onDateChange} onApply={onApply} />
        <SalesChart dataSales={dataSalesChart} isLoading={isLoadingChart} />
      </div>

      <div className="mt-10">
        <SearchBar search={search} setSearch={setSearch} onSearch={onSearch} />
        <SalesTable data={dataSales} isLoading={isLoading} />
      </div>

      <div className="mt-10 mb-28">
        <Statistics data={dataSalesStatistic} isLoading={isLoadingStatistic} />
      </div>
    </div>
  );
}

export default App;
