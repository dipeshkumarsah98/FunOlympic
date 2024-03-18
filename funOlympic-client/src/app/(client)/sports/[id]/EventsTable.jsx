import Tab from "@/components/Tabs";

const people = [
  { title: 'Brazil Vs Argentina', description: 'Football Qualifier Match 1', time: '6:00PM (+5:45 GMT)', teams: 'BRA vs ARG'},
  { title: 'Brazil Vs Argentina', description: 'Football Qualifier Match 1', time: '6:00PM (+5:45 GMT)', teams: 'BRA vs ARG'},
  { title: 'Brazil Vs Argentina', description: 'Football Qualifier Match 1', time: '6:00PM (+5:45 GMT)', teams: 'BRA vs ARG'},
]

// #TODO move this to component
const EventsTable = () => {
  return (
    <div style={{paddingTop: "350px", paddingLeft: "100px", paddingRight: "70px"}}>
    <Tab/>
    <div className="px-5 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Game Title
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Description                 
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Time
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Teams
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Watch Live</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {people.map((person) => (
                  <tr key={person.time}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {person.description}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.description}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.time}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.teams}</td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">
                        Watch Live<span className="sr-only">, {person.description}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>
)}

export default EventsTable;
