import Mock from 'mockjs'
import {fer} from './fer'

Mock.mock('/data/index', 'post', fer)
