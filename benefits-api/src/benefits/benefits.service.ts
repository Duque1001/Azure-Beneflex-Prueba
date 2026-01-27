/*import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Benefit } from './entities/benefit.entity';
import { BenefitCardDto } from './dto/benefitCard.dto';
import { BenefitBalance } from '../benefit-balances/entities/benefit-balance.entity';


@Injectable()
export class BenefitsService {
  constructor(
    @InjectRepository(BenefitBalance)
    private balanceRepo: Repository<BenefitBalance>,
  ) {}

  async getBenefitsForUser(userId: number, year: number) {
    const balances = await this.balanceRepo.find({
      where: { user_id: userId, year },
      relations: ['benefit'],
    });

    return balances.map((b) => ({
      id: b.benefit.id,
      title: b.benefit.name,
      days: b.available_days,
      allowsRange: b.benefit.allows_range,
    }));
  }
}*/ //Wilson

import { Injectable } from '@nestjs/common';

type FunctionBenefit = {
  id?: number | string;
  title?: string;
  name?: string;
  benefit?: string;
  days?: number | string;
  available_days?: number | string;
  availableDays?: number | string;
  allowsRange?: boolean;
  allows_range?: boolean;
};

type FunctionResponse =
  | FunctionBenefit[]
  | { data?: FunctionBenefit[]; items?: FunctionBenefit[] };

export type ApiBenefit = {
  id: number;
  title: string;
  days: number;
  allowsRange: boolean;
};

@Injectable()
export class BenefitsService {
  private base =
    'https://beneflex-functions-ajfsbxbfetexc9cu.canadacentral-01.azurewebsites.net/api';

  async getByUser(userId: number): Promise<ApiBenefit[]> {
    const url = `${this.base}/get-user-benefits?userId=${userId}`;

    const resp = await fetch(url);
    if (!resp.ok) {
      throw new Error(`Function error: ${resp.status}`);
    }

    const data = (await resp.json()) as FunctionResponse;
    const items: FunctionBenefit[] = Array.isArray(data)
      ? data
      : (data.data ?? data.items ?? []);

    return items.map((x, i) => ({
      id: Number(x.id ?? i + 1),
      title: String(x.title ?? x.name ?? x.benefit ?? 'Beneficio'),
      days: Number(x.days ?? x.available_days ?? x.availableDays ?? 0),
      allowsRange: Boolean(x.allowsRange ?? x.allows_range ?? true),
    }));
  }
}
