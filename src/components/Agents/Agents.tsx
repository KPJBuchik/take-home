import type { FC } from "react";
import { useState, useEffect } from "react";
import Agent from "./Agent";
import { IAgent } from "../../types/Agent";
import Axios from "axios";
import './Agents.css'
import { json } from "sequelize/types";

const Agents: FC = () => {

  const [agents, setAgents] =useState<IAgent[]>([]);
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredResults, setFilteredResults] = useState<IAgent[]>([]);

  const searchData = (value) => {
    setSearchTerm(value)
    if (searchTerm !== '') {

      const filteredData = agents.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchTerm.toLowerCase())
      })
      
      console.log(JSON.stringify(filteredData))
      setFilteredResults(filteredData)
    }
    else {
      setFilteredResults(agents)
    }
  }

  
  useEffect(() => {
    async function fetchInitialData() {
      const response = await Axios.get("/agents");
      setAgents(response.data);
    }
    fetchInitialData();
  }, []);




  return (
    <div>
      <input
        className="searchBar"
        placeholder="SEARCH..."
        onChange={(e) => searchData(e.target.value)}
      />
  

    <div className="agents">
      {searchTerm.length >= 1 ? (
        filteredResults.map((agent) => {
          return (
            <Agent key={agent.id} agent={agent} />
          )
        })
      ) : (
        agents.map((agent) => {
          return (
            <Agent key={agent.id} agent={agent} />

          )
        })
      )}
</div>
    </div>
  );
};

export default Agents;
