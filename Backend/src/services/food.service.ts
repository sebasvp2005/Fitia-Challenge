import { Food } from "../models/food.model";
import axios from 'axios';

const tempFoods : Food[]= [
    {
       "name":"Pollo",
       "iconURL":"https:\/\/firebasestorage.googleapis.com:443\/v0\/b\/fitia-27c84.appspot.com\/o\/planner_foods_icons%2F1.png?alt=media&token=c16edcc4-f48c-4810-a2d6-e47ca9dc6f37",
       "macroType":"protein",
       "includeInBreakfast":false,
       "includeInLunch":true,
       "includeInDinner":true,
       "caloriesPerGram":1.2,
       "fatPerGram":0.026,
       "carbsPerGram":0,
       "proteinPerGram":0.225,
       "servingUnit":"g",
       "minSize":75,
       "maxSize":300,
       "sizeIntervals":25,
       "servingName":"g",
       "servingNumber":100,
       "servingSize":100
    },
    {
       "name":"Carne",
       "iconURL":"https:\/\/firebasestorage.googleapis.com:443\/v0\/b\/fitia-27c84.appspot.com\/o\/planner_foods_icons%2F2.png?alt=media&token=766b2ae3-45de-4dd7-87cc-f8d95b8bbba2",
       "macroType":"protein",
       "includeInBreakfast":false,
       "includeInLunch":true,
       "includeInDinner":true,
       "caloriesPerGram":1.845,
       "fatPerGram":0.112,
       "carbsPerGram":0,
       "proteinPerGram":0.203,
       "servingUnit":"g",
       "minSize":75,
       "maxSize":300,
       "sizeIntervals":25,
       "servingName":"g",
       "servingNumber":100,
       "servingSize":100
    },
    {
       "name":"Pescado",
       "iconURL":"https:\/\/firebasestorage.googleapis.com:443\/v0\/b\/fitia-27c84.appspot.com\/o\/planner_foods_icons%2F3.png?alt=media&token=1c43cb4a-b261-49c8-b14b-d3733c673d32",
       "macroType":"protein",
       "includeInBreakfast":false,
       "includeInLunch":true,
       "includeInDinner":true,
       "caloriesPerGram":1.164,
       "fatPerGram":0.041,
       "carbsPerGram":0.003,
       "proteinPerGram":0.193,
       "servingUnit":"g",
       "minSize":75,
       "maxSize":300,
       "sizeIntervals":25,
       "servingName":"g",
       "servingNumber":100,
       "servingSize":100
    },
    {
       "name":"Atún",
       "iconURL":"https:\/\/firebasestorage.googleapis.com:443\/v0\/b\/fitia-27c84.appspot.com\/o\/planner_foods_icons%2F4.png?alt=media&token=4e7b7fad-3b6b-4d62-b095-46cbe5842fa4",
       "macroType":"protein",
       "includeInBreakfast":false,
       "includeInLunch":true,
       "includeInDinner":true,
       "caloriesPerGram":1.57,
       "fatPerGram":0.055,
       "carbsPerGram":0,
       "proteinPerGram":0.251,
       "servingUnit":"g",
       "minSize":60,
       "maxSize":240,
       "sizeIntervals":60,
       "servingName":"lata",
       "servingNumber":1,
       "servingSize":120
    },
    {
       "name":"Huevo - Entero",
       "iconURL":"https:\/\/firebasestorage.googleapis.com:443\/v0\/b\/fitia-27c84.appspot.com\/o\/planner_foods_icons%2F5.png?alt=media&token=e57edd66-f9b4-4f2b-a8b1-8639803fdc10",
       "macroType":"protein",
       "includeInBreakfast":true,
       "includeInLunch":false,
       "includeInDinner":true,
       "caloriesPerGram":1.43,
       "fatPerGram":0.095,
       "carbsPerGram":0.007,
       "proteinPerGram":0.126,
       "servingUnit":"g",
       "minSize":55,
       "maxSize":165,
       "sizeIntervals":55,
       "servingName":"unidad",
       "servingNumber":1,
       "servingSize":55
    },
    {
       "name":"Huevo - Clara",
       "iconURL":"https:\/\/firebasestorage.googleapis.com\/v0\/b\/fitia-27c84.appspot.com\/o\/planner_foods_icons%2F6.png?alt=media&token=3e5b270c-3a9f-4acc-b05c-4bc5c0806130",
       "macroType":"protein",
       "includeInBreakfast":true,
       "includeInLunch":false,
       "includeInDinner":true,
       "caloriesPerGram":0.52,
       "fatPerGram":0.002,
       "carbsPerGram":0.007,
       "proteinPerGram":0.109,
       "servingUnit":"g",
       "minSize":40,
       "maxSize":160,
       "sizeIntervals":40,
       "servingName":"unidad",
       "servingNumber":1,
       "servingSize":40
    },
    {
       "name":"Pavo",
       "iconURL":"https:\/\/firebasestorage.googleapis.com:443\/v0\/b\/fitia-27c84.appspot.com\/o\/planner_foods_icons%2F7.png?alt=media&token=a6c8d3b2-bec5-4ccd-bfdc-2b7d7d79d11d",
       "macroType":"protein",
       "includeInBreakfast":false,
       "includeInLunch":true,
       "includeInDinner":true,
       "caloriesPerGram":1.14,
       "fatPerGram":0.023,
       "carbsPerGram":0,
       "proteinPerGram":0.233,
       "servingUnit":"g",
       "minSize":75,
       "maxSize":300,
       "sizeIntervals":25,
       "servingName":"g",
       "servingNumber":100,
       "servingSize":100
    },
    {
       "name":"Cerdo",
       "iconURL":"https:\/\/firebasestorage.googleapis.com:443\/v0\/b\/fitia-27c84.appspot.com\/o\/planner_foods_icons%2F8.png?alt=media&token=34837d37-6993-40d8-b9a2-66cb40cbb435",
       "macroType":"protein",
       "includeInBreakfast":false,
       "includeInLunch":true,
       "includeInDinner":true,
       "caloriesPerGram":1.32,
       "fatPerGram":0.041,
       "carbsPerGram":0,
       "proteinPerGram":0.224,
       "servingUnit":"g",
       "minSize":75,
       "maxSize":300,
       "sizeIntervals":25,
       "servingName":"g",
       "servingNumber":100,
       "servingSize":100
    },
    {
       "name":"Jamón",
       "iconURL":"https:\/\/firebasestorage.googleapis.com:443\/v0\/b\/fitia-27c84.appspot.com\/o\/planner_foods_icons%2F9.png?alt=media&token=8b449130-263c-4a79-bbf5-253ee5871d49",
       "macroType":"protein",
       "includeInBreakfast":true,
       "includeInLunch":false,
       "includeInDinner":true,
       "caloriesPerGram":1.45,
       "fatPerGram":0.055,
       "carbsPerGram":0.015,
       "proteinPerGram":0.209,
       "servingUnit":"g",
       "minSize":30,
       "maxSize":90,
       "sizeIntervals":30,
       "servingName":"rebanada",
       "servingNumber":1,
       "servingSize":30
    },
    {
       "name":"Tofu",
       "iconURL":"https:\/\/firebasestorage.googleapis.com:443\/v0\/b\/fitia-27c84.appspot.com\/o\/planner_foods_icons%2F10.png?alt=media&token=2c494f9a-3e42-4cb5-b277-b0c2196af8d4",
       "macroType":"protein",
       "includeInBreakfast":true,
       "includeInLunch":true,
       "includeInDinner":true,
       "caloriesPerGram":0.76,
       "fatPerGram":0.048,
       "carbsPerGram":0.019,
       "proteinPerGram":0.081,
       "servingUnit":"g",
       "minSize":120,
       "maxSize":360,
       "sizeIntervals":60,
       "servingName":"taza",
       "servingNumber":1,
       "servingSize":240
    },
    {
       "name":"Arroz",
       "iconURL":"https:\/\/firebasestorage.googleapis.com:443\/v0\/b\/fitia-27c84.appspot.com\/o\/planner_foods_icons%2F101.png?alt=media&token=b07bc437-8970-48e4-94e5-a805b3f5da3a",
       "macroType":"carb",
       "includeInBreakfast":false,
       "includeInLunch":true,
       "includeInDinner":true,
       "caloriesPerGram":1.265,
       "fatPerGram":0.006,
       "carbsPerGram":0.269,
       "proteinPerGram":0.027,
       "servingUnit":"g",
       "minSize":100,
       "maxSize":400,
       "sizeIntervals":50,
       "servingName":"taza",
       "servingNumber":1,
       "servingSize":200
    },
    {
       "name":"Papa",
       "iconURL":"https:\/\/firebasestorage.googleapis.com:443\/v0\/b\/fitia-27c84.appspot.com\/o\/planner_foods_icons%2F102.png?alt=media&token=f6a2174c-ddd6-4116-b938-c3555e4022fe",
       "macroType":"carb",
       "includeInBreakfast":false,
       "includeInLunch":true,
       "includeInDinner":true,
       "caloriesPerGram":0.87,
       "fatPerGram":0.001,
       "carbsPerGram":0.201,
       "proteinPerGram":0.019,
       "servingUnit":"g",
       "minSize":100,
       "maxSize":400,
       "sizeIntervals":50,
       "servingName":"taza",
       "servingNumber":1,
       "servingSize":200
    },
    {
       "name":"Camote",
       "iconURL":"https:\/\/firebasestorage.googleapis.com:443\/v0\/b\/fitia-27c84.appspot.com\/o\/planner_foods_icons%2F103.png?alt=media&token=352cb1e4-f2ab-4db7-b333-7c6b022dcc0a",
       "macroType":"carb",
       "includeInBreakfast":false,
       "includeInLunch":true,
       "includeInDinner":true,
       "caloriesPerGram":0.86,
       "fatPerGram":0.001,
       "carbsPerGram":0.201,
       "proteinPerGram":0.016,
       "servingUnit":"g",
       "minSize":100,
       "maxSize":400,
       "sizeIntervals":50,
       "servingName":"taza",
       "servingNumber":1,
       "servingSize":200
    },
    {
       "name":"Yuca",
       "iconURL":"https:\/\/firebasestorage.googleapis.com:443\/v0\/b\/fitia-27c84.appspot.com\/o\/planner_foods_icons%2F104.png?alt=media&token=8d242a4e-177b-4096-83b1-72b56aaf91e6",
       "macroType":"carb",
       "includeInBreakfast":false,
       "includeInLunch":true,
       "includeInDinner":true,
       "caloriesPerGram":1.6,
       "fatPerGram":0.003,
       "carbsPerGram":0.381,
       "proteinPerGram":0.014,
       "servingUnit":"g",
       "minSize":100,
       "maxSize":400,
       "sizeIntervals":50,
       "servingName":"taza",
       "servingNumber":1,
       "servingSize":200
    },
    {
       "name":"Lentejas",
       "iconURL":"https:\/\/firebasestorage.googleapis.com:443\/v0\/b\/fitia-27c84.appspot.com\/o\/planner_foods_icons%2F105.png?alt=media&token=c254f1eb-63ed-4a5a-861c-75e62d366bf1",
       "macroType":"carb",
       "includeInBreakfast":false,
       "includeInLunch":true,
       "includeInDinner":true,
       "caloriesPerGram":1.16,
       "fatPerGram":0.004,
       "carbsPerGram":0.201,
       "proteinPerGram":0.09,
       "servingUnit":"g",
       "minSize":100,
       "maxSize":400,
       "sizeIntervals":50,
       "servingName":"taza",
       "servingNumber":1,
       "servingSize":200
    },
    {
       "name":"Frijoles",
       "iconURL":"https:\/\/firebasestorage.googleapis.com:443\/v0\/b\/fitia-27c84.appspot.com\/o\/planner_foods_icons%2F106.png?alt=media&token=228f908e-07fc-48e0-b48e-eae81badab8c",
       "macroType":"carb",
       "includeInBreakfast":false,
       "includeInLunch":true,
       "includeInDinner":true,
       "caloriesPerGram":1.38,
       "fatPerGram":0.005,
       "carbsPerGram":0.251,
       "proteinPerGram":0.091,
       "servingUnit":"g",
       "minSize":100,
       "maxSize":400,
       "sizeIntervals":50,
       "servingName":"taza",
       "servingNumber":1,
       "servingSize":200
    },
    {
       "name":"Garbanzos",
       "iconURL":"https:\/\/firebasestorage.googleapis.com:443\/v0\/b\/fitia-27c84.appspot.com\/o\/planner_foods_icons%2F107.png?alt=media&token=ad6086e2-0bb7-46a9-8c3b-218bc8a6ee07",
       "macroType":"carb",
       "includeInBreakfast":false,
       "includeInLunch":true,
       "includeInDinner":true,
       "caloriesPerGram":1.64,
       "fatPerGram":0.026,
       "carbsPerGram":0.274,
       "proteinPerGram":0.089,
       "servingUnit":"g",
       "minSize":100,
       "maxSize":400,
       "sizeIntervals":50,
       "servingName":"taza",
       "servingNumber":1,
       "servingSize":200
    },
    {
       "name":"Arvejas",
       "iconURL":"https:\/\/firebasestorage.googleapis.com:443\/v0\/b\/fitia-27c84.appspot.com\/o\/planner_foods_icons%2F108.png?alt=media&token=7d2f557d-0eeb-4083-ae56-605482fabaca",
       "macroType":"carb",
       "includeInBreakfast":false,
       "includeInLunch":true,
       "includeInDinner":true,
       "caloriesPerGram":0.84,
       "fatPerGram":0.002,
       "carbsPerGram":0.156,
       "proteinPerGram":0.054,
       "servingUnit":"g",
       "minSize":100,
       "maxSize":400,
       "sizeIntervals":50,
       "servingName":"taza",
       "servingNumber":1,
       "servingSize":200
    },
    {
       "name":"Quinua",
       "iconURL":"https:\/\/firebasestorage.googleapis.com:443\/v0\/b\/fitia-27c84.appspot.com\/o\/planner_foods_icons%2F110.png?alt=media&token=81af3e82-2031-412c-ab93-926779594526",
       "macroType":"carb",
       "includeInBreakfast":false,
       "includeInLunch":true,
       "includeInDinner":true,
       "caloriesPerGram":1.2,
       "fatPerGram":0.019,
       "carbsPerGram":0.213,
       "proteinPerGram":0.044,
       "servingUnit":"g",
       "minSize":100,
       "maxSize":400,
       "sizeIntervals":50,
       "servingName":"taza",
       "servingNumber":1,
       "servingSize":200
    },
    {
       "name":"Pasta",
       "iconURL":"https:\/\/firebasestorage.googleapis.com:443\/v0\/b\/fitia-27c84.appspot.com\/o\/planner_foods_icons%2F111.png?alt=media&token=0b330d22-57d6-4b2b-9835-8c48c06f9277",
       "macroType":"carb",
       "includeInBreakfast":false,
       "includeInLunch":true,
       "includeInDinner":true,
       "caloriesPerGram":1.58,
       "fatPerGram":0.009,
       "carbsPerGram":0.309,
       "proteinPerGram":0.058,
       "servingUnit":"g",
       "minSize":160,
       "maxSize":480,
       "sizeIntervals":80,
       "servingName":"taza",
       "servingNumber":1,
       "servingSize":160
    },
    {
       "name":"Choclo",
       "iconURL":"https:\/\/firebasestorage.googleapis.com:443\/v0\/b\/fitia-27c84.appspot.com\/o\/planner_foods_icons%2F112.png?alt=media&token=178d4332-bfa0-4500-96ad-9a78111b5c2f",
       "macroType":"carb",
       "includeInBreakfast":false,
       "includeInLunch":true,
       "includeInDinner":true,
       "caloriesPerGram":1.04,
       "fatPerGram":0.008,
       "carbsPerGram":0.278,
       "proteinPerGram":0.033,
       "servingUnit":"g",
       "minSize":75,
       "maxSize":450,
       "sizeIntervals":37.5,
       "servingName":"taza",
       "servingNumber":1,
       "servingSize":150
    },
    {
       "name":"Popcorn",
       "iconURL":"https:\/\/firebasestorage.googleapis.com:443\/v0\/b\/fitia-27c84.appspot.com\/o\/planner_foods_icons%2F113.png?alt=media&token=8085f242-2ea0-438b-8b1e-d2455ad35c43",
       "macroType":"carb",
       "includeInBreakfast":false,
       "includeInLunch":false,
       "includeInDinner":false,
       "caloriesPerGram":3.87,
       "fatPerGram":0.045,
       "carbsPerGram":0.778,
       "proteinPerGram":0.129,
       "servingUnit":"g",
       "minSize":16,
       "maxSize":64,
       "sizeIntervals":8,
       "servingName":"taza cocinada",
       "servingNumber":1,
       "servingSize":8
    },
    {
       "name":"Avena",
       "iconURL":"https:\/\/firebasestorage.googleapis.com:443\/v0\/b\/fitia-27c84.appspot.com\/o\/planner_foods_icons%2F114.png?alt=media&token=43c3c5bf-f14c-463a-9369-27f6d41a8b47",
       "macroType":"carb",
       "includeInBreakfast":true,
       "includeInLunch":false,
       "includeInDinner":true,
       "caloriesPerGram":3.79,
       "fatPerGram":0.065,
       "carbsPerGram":0.677,
       "proteinPerGram":0.132,
       "servingUnit":"g",
       "minSize":20,
       "maxSize":150,
       "sizeIntervals":10,
       "servingName":"cucharada",
       "servingNumber":1,
       "servingSize":10
    },
    {
       "name":"Pan",
       "iconURL":"https:\/\/firebasestorage.googleapis.com:443\/v0\/b\/fitia-27c84.appspot.com\/o\/planner_foods_icons%2F115.png?alt=media&token=bfbc82f2-b6ae-4615-9eff-b4c4013a3cba",
       "macroType":"carb",
       "includeInBreakfast":true,
       "includeInLunch":false,
       "includeInDinner":true,
       "caloriesPerGram":2.59,
       "fatPerGram":0.034,
       "carbsPerGram":0.461,
       "proteinPerGram":0.107,
       "servingUnit":"g",
       "minSize":40,
       "maxSize":160,
       "sizeIntervals":40,
       "servingName":"rebanada",
       "servingNumber":1,
       "servingSize":40
    },
    {
       "name":"Cereal",
       "iconURL":"https:\/\/firebasestorage.googleapis.com:443\/v0\/b\/fitia-27c84.appspot.com\/o\/planner_foods_icons%2F117.png?alt=media&token=0f756af5-8839-4a07-8ef0-e59c39a62348",
       "macroType":"carb",
       "includeInBreakfast":true,
       "includeInLunch":false,
       "includeInDinner":true,
       "caloriesPerGram":3.57,
       "fatPerGram":0.004,
       "carbsPerGram":0.84,
       "proteinPerGram":0.08,
       "servingUnit":"g",
       "minSize":20,
       "maxSize":150,
       "sizeIntervals":10,
       "servingName":"cucharada",
       "servingNumber":1,
       "servingSize":10
    },
    {
       "name":"Palta",
       "iconURL":"https:\/\/firebasestorage.googleapis.com:443\/v0\/b\/fitia-27c84.appspot.com\/o\/planner_foods_icons%2F201.png?alt=media&token=5bd39e8a-801d-40b2-9f8e-cc31c7cc68a6",
       "macroType":"fat",
       "includeInBreakfast":true,
       "includeInLunch":true,
       "includeInDinner":true,
       "caloriesPerGram":1.6,
       "fatPerGram":0.147,
       "carbsPerGram":0.085,
       "proteinPerGram":0.02,
       "servingUnit":"g",
       "minSize":60,
       "maxSize":240,
       "sizeIntervals":60,
       "servingName":"unidad",
       "servingNumber":1,
       "servingSize":240
    },
    {
       "name":"Maní",
       "iconURL":"https:\/\/firebasestorage.googleapis.com:443\/v0\/b\/fitia-27c84.appspot.com\/o\/planner_foods_icons%2F202.png?alt=media&token=4193a773-0cce-42e6-b3ee-559b42054c93",
       "macroType":"fat",
       "includeInBreakfast":true,
       "includeInLunch":false,
       "includeInDinner":false,
       "caloriesPerGram":5.67,
       "fatPerGram":0.492,
       "carbsPerGram":0.161,
       "proteinPerGram":0.258,
       "servingUnit":"g",
       "minSize":14,
       "maxSize":112,
       "sizeIntervals":14,
       "servingName":"cucharada",
       "servingNumber":1,
       "servingSize":14
    },
    {
       "name":"Almendras",
       "iconURL":"https:\/\/firebasestorage.googleapis.com:443\/v0\/b\/fitia-27c84.appspot.com\/o\/planner_foods_icons%2F203.png?alt=media&token=72016673-3351-4b40-94cb-664fa05d3b86",
       "macroType":"fat",
       "includeInBreakfast":true,
       "includeInLunch":false,
       "includeInDinner":false,
       "caloriesPerGram":5.79,
       "fatPerGram":0.499,
       "carbsPerGram":0.216,
       "proteinPerGram":0.212,
       "servingUnit":"g",
       "minSize":14,
       "maxSize":112,
       "sizeIntervals":14,
       "servingName":"cucharada",
       "servingNumber":1,
       "servingSize":14
    },
    {
       "name":"Pecanas",
       "iconURL":"https:\/\/firebasestorage.googleapis.com:443\/v0\/b\/fitia-27c84.appspot.com\/o\/planner_foods_icons%2F204.png?alt=media&token=4980deaf-aa44-4949-a2b7-d4b83ea415b0",
       "macroType":"fat",
       "includeInBreakfast":true,
       "includeInLunch":false,
       "includeInDinner":false,
       "caloriesPerGram":6.91,
       "fatPerGram":0.72,
       "carbsPerGram":0.139,
       "proteinPerGram":0.092,
       "servingUnit":"g",
       "minSize":12,
       "maxSize":120,
       "sizeIntervals":3,
       "servingName":"unidad",
       "servingNumber":1,
       "servingSize":3
    },
    {
       "name":"Cashews",
       "iconURL":"https:\/\/firebasestorage.googleapis.com:443\/v0\/b\/fitia-27c84.appspot.com\/o\/planner_foods_icons%2F205.png?alt=media&token=3507572c-2445-4082-970c-29059e339f07",
       "macroType":"fat",
       "includeInBreakfast":true,
       "includeInLunch":false,
       "includeInDinner":false,
       "caloriesPerGram":5.53,
       "fatPerGram":0.439,
       "carbsPerGram":0.302,
       "proteinPerGram":0.182,
       "servingUnit":"g",
       "minSize":14,
       "maxSize":112,
       "sizeIntervals":14,
       "servingName":"cucharada",
       "servingNumber":1,
       "servingSize":14
    },
    {
       "name":"Nueces",
       "iconURL":"https:\/\/firebasestorage.googleapis.com:443\/v0\/b\/fitia-27c84.appspot.com\/o\/planner_foods_icons%2F206.png?alt=media&token=76f62be9-eb2e-4f0c-87ee-65c4d9bb37cf",
       "macroType":"fat",
       "includeInBreakfast":true,
       "includeInLunch":false,
       "includeInDinner":false,
       "caloriesPerGram":6.54,
       "fatPerGram":0.652,
       "carbsPerGram":0.137,
       "proteinPerGram":0.152,
       "servingUnit":"g",
       "minSize":16,
       "maxSize":128,
       "sizeIntervals":4,
       "servingName":"unidad",
       "servingNumber":1,
       "servingSize":4
    },
    {
       "name":"Aceitunas",
       "iconURL":"https:\/\/firebasestorage.googleapis.com:443\/v0\/b\/fitia-27c84.appspot.com\/o\/planner_foods_icons%2F207.png?alt=media&token=d64af135-3b71-4a1d-92f5-6e475674c765",
       "macroType":"fat",
       "includeInBreakfast":true,
       "includeInLunch":true,
       "includeInDinner":true,
       "caloriesPerGram":1.16,
       "fatPerGram":0.109,
       "carbsPerGram":0.06,
       "proteinPerGram":0.008,
       "servingUnit":"g",
       "minSize":25,
       "maxSize":100,
       "sizeIntervals":5,
       "servingName":"unidad",
       "servingNumber":1,
       "servingSize":5
    },
    {
       "name":"Chía",
       "iconURL":"https:\/\/firebasestorage.googleapis.com:443\/v0\/b\/fitia-27c84.appspot.com\/o\/planner_foods_icons%2F208.png?alt=media&token=feca9280-8764-4d1d-afc6-a7ec5a5ab8f4",
       "macroType":"fat",
       "includeInBreakfast":true,
       "includeInLunch":false,
       "includeInDinner":true,
       "caloriesPerGram":4.86,
       "fatPerGram":0.307,
       "carbsPerGram":0.421,
       "proteinPerGram":0.165,
       "servingUnit":"g",
       "minSize":10,
       "maxSize":50,
       "sizeIntervals":10,
       "servingName":"cucharada",
       "servingNumber":1,
       "servingSize":10
    },
    {
       "name":"Chocolate",
       "iconURL":"https:\/\/firebasestorage.googleapis.com:443\/v0\/b\/fitia-27c84.appspot.com\/o\/planner_foods_icons%2F209.png?alt=media&token=b64cf3a2-141e-4cb1-a750-d2fe47c24f5c",
       "macroType":"fat",
       "includeInBreakfast":true,
       "includeInLunch":false,
       "includeInDinner":false,
       "caloriesPerGram":5.35,
       "fatPerGram":0.297,
       "carbsPerGram":0.594,
       "proteinPerGram":0.077,
       "servingUnit":"g",
       "minSize":20,
       "maxSize":100,
       "sizeIntervals":10,
       "servingName":"cuadradito",
       "servingNumber":1,
       "servingSize":10
    }
 ]

const mealsFilter: Record<string, keyof Food> = {
    "breakfast": "includeInBreakfast",
    "lunch": "includeInLunch",
    "dinner": "includeInDinner"
};


export const getFoods = async(): Promise<Food[]> =>{
    const response = await axios.get<Food[]>('https://storage.googlrtheapis.com/fitia_public_files/dataset.json');
    return response.data;
};



export const getFoodFilterByMealType = async(mealType: string): Promise<Food[]> =>{
    const foods = tempFoods;
    return foods.filter(food => food[mealsFilter[mealType]]);
};

export const classifyFoodsByMacroType = (foods: Food[]): Record<Food['macroType'], Food[]> => {
    return foods.reduce<Record<Food['macroType'], Food[]>>((acc, food) => {
      if (!acc[food.macroType]) {
        acc[food.macroType] = [];
      }
      acc[food.macroType].push(food);
      return acc;
    }, { protein: [], carb: [], fat: [] }); 
};