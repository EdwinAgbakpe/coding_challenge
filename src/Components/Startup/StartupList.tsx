import { Fragment, ReactElement, useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import {StartupHttpService} from "../../Http/Startup/Startup.http.service";
import {Startup} from "../../Types/Startup";

export default function StartupList(): ReactElement {
  const [startupList, setStartupList] = useState<Startup[]>([]);
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

  return (
    <Fragment>
      <div id="startup-list">
        {startupList.map((startup : Startup) => (
          StartupCard(startup)
        ))}
      </div>
    </Fragment>
  );
}
