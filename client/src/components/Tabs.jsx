import React from 'react'
import { Tab} from '@headlessui/react'

function classNames(...classes){
    return classes.filter(Boolean).join(" ");
}

const Tabs = ({tabs, setSelected, children}) => {
  return (
    <div className="w-full px-1 sm:px-0 ">
        <Tab.Group>
            <Tab.List className="flex space-x-6 rounded-xl p-1">
                {
                    tabs.map((tab,index)=>(
                        <Tab key={index + tab.title}
                        onClick={()=> setSelected(index)}
                        className={({selected})=> classNames("w-fit flex items-center outline-none gap-2 px-3 py-2.5 text-base font-medium leading-5 bg-white ", selected ? "text-blue-700 border-b-2 border-blue-600" : "text-gray-800 hover:text-blue-800")}
                        >
                            {tab.icon}
                            <span>{tab.title}</span>
                            
                        </Tab>
                    ))
                }

            </Tab.List>
            <Tab.Panel className="w-full mt-2 ">
                {children}
            </Tab.Panel>
        </Tab.Group>
      
    </div>
  )
}

export default Tabs
