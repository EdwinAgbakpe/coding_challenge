import { Fragment, ReactElement, useEffect, useState, ChangeEvent } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';

import {StartupHttpService} from "../../Http/Startup/Startup.http.service";
import {Startup} from "../../Types/Startup";

export default function StartupList(): ReactElement {
  const numObjects = 20;
  const [startupList, setStartupList] = useState<Startup[]>([]);
  const [currPage, setCurrPage] = useState<number>(1);
  useEffect(() => {
    StartupHttpService.getStartupList()
      .then(res => (setStartupList([...res])));
  }, [])

  const StartupCard = (startup: Startup) => (
    <Card sx={{minWidth: 500, mb: 3}}>
      <CardContent>
        <Typography variant='h5' color="text.primary" gutterBottom>
          {startup.name}
        </Typography>
        <Typography variant='body2' sx={{mt: 0.5}} color='text.secondary'>
          Founded: {startup.dateFounded.getFullYear()} | {startup.employees} Employees | $ {startup.totalFunding} Mio. | {startup.currentInvestmentStage}
        </Typography>
        <Typography variant='body1' sx={{mt: 1.5}} color='text.primary'>
          {startup.shortDescription}
        </Typography>
      </CardContent>
    </Card>
  )

  const objectsToDisplay = (page:number) => (startupList.slice((page - 1)*numObjects, page * numObjects))
  const numPages = Math.ceil(startupList.length/20);
  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setCurrPage(value);
  };
  
  return (
    <Fragment>
      <div id="startup-list">
        {objectsToDisplay(currPage).map((startup : Startup) => (
          StartupCard(startup)
        ))}
        <Pagination
          sx={{ml: 'auto', mr:'auto', width: '30%' }}
          count={numPages}
          color="primary"
          page={currPage}
          onChange={handleChange}
        />
      </div>
    </Fragment>
  );
}
