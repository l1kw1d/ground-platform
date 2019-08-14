/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import {getFeatureRecords} from '../../datastore.js';
import {withStyles} from '@material-ui/core/styles';

const styles = (theme) => ({
  paper: {
    top: 62,
    paddingTop: 20,
    width: 300,
  },
  title: {
    fontWeight: 'bold',
  },
  date: {
    fontStyle: 'italic',
  },
  key: {
    fontSize: 12,
    marginBlockEnd: '0.2em',
    color: 'gray',
  },
  value: {
    marginBlockStart: '0.2em',
  },
  card: {
    marginBottom: 20,
  },
  cardHeaderRoot: {
    paddingBottom: 0,
  },
  cardContentRoot: {
    paddingTop: 0,
  },
});

type Props = {
  match: Object,
  records: {
    featureId: String,
    formId: String,
    responses: Array
  },
  classes: Object,
};

class GndFeatureDetails extends React.Component<Props> {
  render() {
    if (!this.props.records) return null;
    const {records, classes} = this.props;
    // eslint-disable-next-line max-len
    const recordsList = Object.entries(records).map(([recordId, record], index) => {
      // eslint-disable-next-line max-len
      const responsesList = Object.entries(record.responses).map(([key, value], idx) => {
        return <Typography key={idx} variant='subheading'>
          <p className={classes.key}>{key}</p>
          <p className={classes.value}>{value}</p>
        </Typography>;
      });
      return <Card key={index} classes={{root: classes.card}}>
        <CardHeader title={record.created.user.displayName} classes={{title: classes.title, root: classes.cardHeaderRoot}}/>
        <CardContent classes={{root: classes.cardContentRoot}}>
          <p className={classes.date}>{record.created.clientTimestamp}</p>
          {responsesList}
        </CardContent>
      </Card>;
    });
    return (
      <Drawer
        anchor="right"
        open={true}
        pullRight={true}
        classes={{paper: classes.paper}}
      >
        {recordsList}
      </Drawer>
    );
  }
}

const mapStateToProps = (store) => ({
  records: getFeatureRecords(store),
});

const enhance = compose(
    connect(
        mapStateToProps
    ),
    withStyles(styles)
);

export default enhance(GndFeatureDetails);