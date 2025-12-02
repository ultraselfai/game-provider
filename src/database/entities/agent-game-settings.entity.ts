import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Agent } from './agent.entity';

/**
 * Configurações de jogo customizadas por Agente
 * Permite que cada operador defina RTP e chance de vitória dos seus jogos
 * 
 * Prioridade: AgentGameSettings > GameSettings (global) > Config estático
 */
@Entity('agent_game_settings')
@Unique(['agentId', 'gameCode'])
export class AgentGameSettings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'agent_id', type: 'uuid' })
  agentId: string;

  @ManyToOne(() => Agent, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'agent_id' })
  agent: Agent;

  @Column({ name: 'game_code', length: 50 })
  gameCode: string;

  /**
   * RTP (Return to Player) - Porcentagem que retorna ao jogador a longo prazo
   * Valores típicos: 85-99%
   * - Menor RTP = mais lucro para o operador
   * - Maior RTP = jogadores ganham mais
   */
  @Column({ name: 'rtp', type: 'decimal', precision: 5, scale: 2, default: 96.5 })
  rtp: number;

  /**
   * Chance de Vitória - Probabilidade de ganhar em cada spin (%)
   * Valores típicos: 20-50%
   * - Menor = vitórias menos frequentes mas maiores
   * - Maior = vitórias mais frequentes mas menores
   */
  @Column({ name: 'win_chance', type: 'integer', default: 35 })
  winChance: number;

  /**
   * Indica se o agente customizou este jogo
   * Se false, usa configuração global
   */
  @Column({ name: 'is_customized', default: true })
  isCustomized: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
