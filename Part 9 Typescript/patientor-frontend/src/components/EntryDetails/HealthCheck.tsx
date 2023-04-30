import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { HealthCheckEntry } from "../../types";

const HealthCheck = ({ entry }: { entry: HealthCheckEntry }) => {
  const ratingIcons = [];
  for (let i = 0; i < entry.healthCheckRating; i++) {
    ratingIcons.push(<SentimentSatisfiedAltIcon key={i} />);
  }

  return (
    <div>
      <div>{entry.date}</div>
      <div>{entry.description}</div>
      <div>
        {(() => {
          switch (entry.healthCheckRating) {
            case 0:
              return (
                <div>
                  <SentimentSatisfiedAltIcon/>
                  <SentimentSatisfiedAltIcon/>
                </div>
              );
            case 1:
              return (
                <div>
                  <SentimentSatisfiedAltIcon/>
                </div>
              );
            case 2:
              return (
                <div>
                  <SentimentVeryDissatisfiedIcon/>
                </div>
              );
            case 3:
              return (
                <div>
                  <SentimentVeryDissatisfiedIcon/>
                  <SentimentVeryDissatisfiedIcon/>
                </div>
              );
            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
};

export default HealthCheck;
